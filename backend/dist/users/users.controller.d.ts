import { UsersService } from './users.service';
import { User } from './user.model';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUser(): Promise<User[]>;
    createUser(user: User): void;
    remove(id: string): void;
}
