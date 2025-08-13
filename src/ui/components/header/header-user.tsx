'use client';

import {
  BarChart,
  LogOut,
  Settings,
  Shield,
  Upload,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { cn } from '~/lib/cn';
import { Avatar, AvatarFallback, AvatarImage } from '~/ui/primitives/avatar';
import { Button } from '~/ui/primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/ui/primitives/dropdown-menu';

interface HeaderUserDropdownProps {
  isDashboard: boolean;
  userEmail: string;
  userImage?: null | string;
  userName: string;
}

export function HeaderUserDropdown({
  isDashboard = false,
  userEmail,
  userImage,
  userName,
}: HeaderUserDropdownProps) {
  const { t } = useTranslation('common');

  const fallbackInitials =
    userName
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2) || '';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative overflow-hidden rounded-full" size="icon" variant="ghost" aria-label={t('userMenu.openMenu')}>
          <Avatar className="h-9 w-9">
            <AvatarImage alt={userName || t('userMenu.user')} src={userImage || undefined} />
            <AvatarFallback>
              {fallbackInitials ? (
                fallbackInitials
              ) : (
                <UserIcon className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8 bg-primary/10">
            <AvatarImage alt={userName || t('userMenu.user')} src={userImage || undefined} />
            <AvatarFallback>
              {fallbackInitials ? (
                fallbackInitials
              ) : (
                <UserIcon className="h-4 w-4 text-primary" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-medium">{userName || t('userMenu.user')}</p>
            <p className="max-w-[160px] truncate text-xs text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/stats">
            <BarChart className="mr-2 h-4 w-4" />
            {t('userMenu.stats')}
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            {t('userMenu.profile')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/settings">
            <Settings className="mr-2 h-4 w-4" />
            {t('userMenu.settings')}
          </Link>
        </DropdownMenuItem>

        {/* <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/dashboard/uploads">
            <Upload className="mr-2 h-4 w-4" />
            {t('userMenu.uploads')}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/admin/summary">
            <Shield className="mr-2 h-4 w-4" />
            {t('userMenu.admin')}
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          asChild
          className={cn(
            'cursor-pointer',
            isDashboard ? 'text-red-600' : 'text-destructive focus:text-destructive'
          )}
        >
          <Link href="/auth/sign-out">
            <LogOut className="mr-2 h-4 w-4" />
            {t('userMenu.logout')}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
