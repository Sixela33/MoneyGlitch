import { Injectable } from '@nestjs/common';
import { findTriangularArbitrageOpportunities, startArbitrageMonitoring } from './utils/FindOportunities';
import { UserService } from 'src/user/user.service';
import { PublicKey, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ArbitrageOpportunity } from './utils/FindOportunities';
import { User } from 'src/user/entities/user.entity';
import { executeArbitrageSwap } from './utils/swap';
import { StatisticsSnapshot } from './entities/statistics-snapshot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArbitrageService {

    constructor(
        @InjectRepository(StatisticsSnapshot)
        private readonly statisticsSnapshotRepository: Repository<StatisticsSnapshot>,
        private readonly userService: UserService) {}
    
    async onModuleInit() {
        const monitor = startArbitrageMonitoring({
            minProfit: 0.0008,
            baseCurrencies: ['USDT', 'USDC', 'SOL'],
            maxResults: 3,
            
            onOpportunityFound: (opportunities) => {
                console.log(`🎯 Found ${opportunities.length} profitable opportunities!`);
                opportunities.forEach(opp => {
                    console.log(`💰 ${opp.tradingPath.join(' → ')} - ${(opp.profitRatio * 100).toFixed(3)}%`);
                });
                this.placeTradeOnAllUsers(opportunities[0]);
            },
            
            onError: (error) => {
                console.error(`🚨 Error occurred: ${error.message}`);
            },
            
            onNoOpportunities: () => {
                console.log(`🔍 Still searching... (${new Date().toLocaleTimeString()})`);
            }
        });

        // Stop monitoring after some time
        // setTimeout(() => {
        //     monitor.stop();
        // }, 60000); // Stop after 1 minute
    }

    async placeTradeOnAllUsers(opportunity: ArbitrageOpportunity) {
        const users = await this.userService.findAllSubscribed();
        const promises = users.map(async (user) => {
            return this.handleArbitrageOpportunity(opportunity, user);
        });
        await Promise.all(promises);
    }

    async handleArbitrageOpportunity(opportunity: ArbitrageOpportunity, user: User) {
        const balance = await this.getSolanaBalance(user.walletAddress);
        if (balance > 0) {
            await executeArbitrageSwap(opportunity, balance);
        }

    }

    async getSolanaBalance(walletAddress: string) {
        const connection = new Connection('https://api.devnet.solana.com');
        const balance = await connection.getBalance(new PublicKey(walletAddress));
        console.log("balance", balance);
        return balance / LAMPORTS_PER_SOL;
    }
}
