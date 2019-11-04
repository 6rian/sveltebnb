<script>
	import axios from 'axios'
	import {showModal, showLoginModal, showRegistrationModal} from '../store.js'
	import {stores} from '@sapper/app'
	export let segment;

	const {session} = stores()
</script>

<style>
	.nav-container {
		border-bottom: 1px solid #eee;
		height: 60px;
	}

	img {
		float: left;
	}

	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
		float: right;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<div class="nav-container">
	<img src="https://picsum.photos/60?random=3" alt="" />
	<nav>
		<ul>
			<li>
				<a class='{segment === undefined ? "selected" : ""}' href="become-a-host">Become a host</a>
			</li>
			{#if $session.user}
				<li style="padding: 1em 0.5em;">{$session.user}</li>
				<li>
					<a href='javascript:;'
						on:click={async () => {
							await axios.post('auth/logout')
							session.set({user: null})
						}}
					>
						Log Out
					</a>
				</li>
			{:else}
				<li>
					<a class='{segment === "register" ? "selected" : ""}' 
						href='javascript:;'
						on:click={() => {
							showModal.set(true)
							showLoginModal.set(false)
							showRegistrationModal.set(true)
						}}
					>
						Sign up
					</a>
				</li>
				<li>
					<a class='{segment === "login" ? "selected" : ""}' 
						href='javascript:;'
						on:click={() => {
							showModal.set(true)
							showLoginModal.set(true)
							showRegistrationModal.set(false)
						}}
					>
						Log in
					</a>
				</li>
			{/if}
		</ul>
	</nav>
</div>