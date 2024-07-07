<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, DarkMode } from 'flowbite-svelte';
</script>
<div>
    <Navbar let:NavContainer>
        <NavContainer class="border px-5 py-2 rounded-lg bg-white dark:bg-gray-600">
            <NavBrand href="/">
                <img src="src/images/printerbench.svg" class="me-6 h-12 sm:h-15" alt="PrinterBench Logo" />
                <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">PrinterBench</span>
            </NavBrand>
            <div class="flex md:order-2">
                <Button size="sm">Get started</Button>
                <DarkMode />
                <NavHamburger />
            </div>
            <NavUl class="order-1">
                <NavLi href="/leaderboard">LeaderBoard</NavLi>
                <NavLi href="/add">Add Printer</NavLi>
                <NavLi href="/profile">My Profile</NavLi>
            </NavUl>
        </NavContainer>
    </Navbar>
</div>