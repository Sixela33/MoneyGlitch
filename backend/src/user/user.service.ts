import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as solanaWeb3 from "@solana/web3.js";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {}

  async updateHashedRefreshToken(userId: string, hashedRefreshToken?: string) {
    return await this.UserRepo.update(
      { id: userId }, 
      { hashedRefreshToken: hashedRefreshToken || "" }
    );
  }

  async create(createUserDto: CreateUserDto) {

    const wallet = solanaWeb3.Keypair.generate();
    const walletAddress = wallet.publicKey.toBase58();
    const walletPrivateKey = wallet.secretKey;

    createUserDto.walletAddress = walletAddress.toString();
    createUserDto.walletPrivateKey = walletPrivateKey.toString();

    const user = await this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.UserRepo.findOne({
      where: {
        email,
      },
    });
  }

  findAllSubscribed() {
    return this.UserRepo.find({
      where: {
        isSubscribed: true,
      },
    });
  }

  async findOne(id: string) {
    return this.UserRepo.findOne({
      where: { id: id },
      select: [
        'id',
        'firstName',
        'lastName',
        'avatarUrl',
        'hashedRefreshToken',
        'role',
        'walletAddress',
        'isSubscribed',
      ],
    });
  }

  async subscribe(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isSubscribed = !user.isSubscribed;
    return await this.UserRepo.update(
      { id: id },
      { isSubscribed: isSubscribed }
    );
  }

  async withdraw(id: string, amount: number, address: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
   
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
    const transaction = new solanaWeb3.Transaction();
    const instruction = solanaWeb3.SystemProgram.transfer({
      fromPubkey: new solanaWeb3.PublicKey(user.walletAddress),
      toPubkey: new solanaWeb3.PublicKey(address),
      lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
    });
    
    transaction.add(instruction);
    
    const keypair = solanaWeb3.Keypair.fromSecretKey(
      Buffer.from(JSON.parse(user.walletPrivateKey))
    );
    const signature = await connection.sendTransaction(transaction, [keypair]);
    await connection.confirmTransaction(signature);
    return signature;
  }
}
