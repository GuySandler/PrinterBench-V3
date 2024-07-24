<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Avatar, Dropdown, DropdownItem } from 'flowbite-svelte';
    import { signIn, signOut } from '$lib/firebase';
    import { profileImg } from '../stores.js';
    import { redirect } from '@sveltejs/kit';

    let profileImage;

	profileImg.subscribe((value) => {
		profileImage = value;
	});
    let update = false;
    $: update = !update;
</script>
<div>
    <Navbar let:NavContainer>
        <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
            <NavBrand href="/">
                <img src="src/images/printerbench.svg" class="me-6 h-12 sm:h-15" alt="PrinterBench Logo" />
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PrinterBench</span>
            </NavBrand>
            <div class="flex md:order-2">
                <DarkMode />
                <div style="cursor:pointer">
                    <Avatar src={profileImage} rounded />
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 10 4 4 4-4"/>
                    </svg>
                </div>
                <Dropdown>
                    <DropdownItem>Dashboard</DropdownItem>
                    <DropdownItem on:click={() => function(){redirect(302, '/')}}>Settings</DropdownItem>
                    <DropdownItem on:click={signIn}>Log In</DropdownItem>
                    {#if profileImage != ""}<DropdownItem on:click={signOut}>Sign out</DropdownItem>{/if}
                </Dropdown>
                <NavHamburger />
            </div>
            <NavUl class="order-1">
                <NavLi href="/leaderboard">LeaderBoard</NavLi>
                <NavLi href="/add">Add Printer</NavLi>
                {#if profileImage != ""}<NavLi href="/profile">My Profile</NavLi>{/if}
            </NavUl>
        </NavContainer>
    </Navbar>
</div>