import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SearchIcon, UserIcon } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
	return (
		<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-card/20 px-6'>
			<Link
				className='lg:hidden flex items-center gap-2 font-semibold'
				href='/app'
			>
				<Image
					src='/logo.svg'
					width='30'
					height='30'
					alt='logo'
					className='shadow-sm border border-border rounded'
				/>
				<span className='sr-only'>Cardify</span>
			</Link>
			<form className='flex-1 ml-auto sm:flex-initial'>
				<div className='relative'>
					<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
					<Input
						className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
						placeholder='Search anything in the app...'
						type='search'
					/>
				</div>
			</form>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className='rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800'
						id='menu'
						size='icon'
						variant='ghost'
					>
						<UserIcon className='h-4 w-4' />
						<span className='sr-only'>Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align='end'
					aria-labelledby='menu'
					className='rounded-lg'
				>
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Settings</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Logout</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	)
}
