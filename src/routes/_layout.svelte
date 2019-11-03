<script>
	import {showModal, showLoginModal, showRegistrationModal} from '../store.js'
	import Nav from '../components/Nav.svelte'
	import Modal from '../components/Modal.svelte'
	import LoginModal from '../components/LoginModal.svelte'
	import RegistrationModal from '../components/RegistrationModal.svelte'

	export let segment
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>

{#if $showModal}
	<Modal on:close={() => showModal.set(false)}>
		{#if $showLoginModal}
			<LoginModal
				on:showSignup={() => {
					showLoginModal.set(false)
					showRegistrationModal.set(true)
				}}
			></LoginModal>
		{/if}
		{#if $showRegistrationModal}
			<RegistrationModal
				on:showLogin={() => {
					showRegistrationModal.set(false)
					showLoginModal.set(true)
				}}
			>
			</RegistrationModal>
		{/if}
	</Modal>
{/if}