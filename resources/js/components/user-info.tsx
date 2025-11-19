import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
        {/* https://preview.redd.it/gen-the-greatest-manipulator-in-dr-stone-v0-35mh5vtc2moc1.jpeg?width=1125&auto=webp&s=87152a34da252d937e12533a3de45bcabd17ded9 */}
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src='https://pbs.twimg.com/media/GjKKFZbbsAEOV_z.jpg' alt={user.name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
