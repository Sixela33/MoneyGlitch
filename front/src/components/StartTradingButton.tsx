import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogOut, User } from 'lucide-react';
import { useUser } from '../contexts/UserContext';


export default function StartTradingButton() {
    const { user, isLoading, error, refetchUser, handleLogout } = useUser();


    console.log("user", user);
    function handleGoogleLogin() {
        window.location.href = 'http://localhost:3000/auth/google/login';
    }

    if (isLoading) {
        return <Button disabled>Loading...</Button>;
    }

    if (!user) {
        return (
            <div className="flex justify-center">
                <Button
                    onClick={handleGoogleLogin}
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-black font-mono tracking-widest border border-green-500 shadow-md shadow-green-400/30 rounded-full px-8 py-6 text-lg transition duration-300"
                >
                    <User className="mr-2 h-4 w-4" />
                    Login with Google
                </Button>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full flex items-center justify-start gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.firstName?.charAt(0) + user.lastName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="truncate">{user.firstName} {user.lastName}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-sm">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}