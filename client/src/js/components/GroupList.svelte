<script>
    import { onMount } from "svelte";
    import { myGroups, groups, isAuthenticated, user } from "../store.js";
    import { fetchGroups, fetchMyGroups } from "../groupJoin.mjs";
    import Group from "./GroupDisplay.svelte";

    onMount(() => {
        fetchGroups();
        fetchMyGroups($user.sub);
        console.log('here');
        console.log($user.name);
    });
    
</script>
{#if $isAuthenticated}
<section id="suggested-groups">
    <h1>Suggested Groups</h1>
    {#each $groups as group}
        <Group {group}></Group>
    {/each}
</section>
{/if}
<style>
    #suggested-groups {
        background-color: rgba(136, 132, 132, 0.5);
        border: 3px solid #0056b3;
        border-radius: 15px;
        padding: 20px;
        margin-right: 20px;
        margin-bottom: 20px;
        height: 400px;
        overflow-y: scroll;
        /* -ms-overflow-style: none;  IE and Edge */
        /* scrollbar-width: none;  Firefox */
    }
    #suggested-groups::-webkit-scrollbar {
        width: 10px;
    }
    #suggested-groups::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px gray;
        border-radius: 10px;
    }
    #suggested-groups::-webkit-scrollbar-thumb {
        background: #0056b3;
        border-radius: 10px;
    }
    #suggested-groups::-webkit-scrollbar-thumb:hover {
        background: #007bff;
    }
    #suggested-groups h1 {
        font-size: 1.5em;
        margin: 0;
    }
</style>