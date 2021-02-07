<script>
	import { checkWinner, isDraw, get_move_index } from "./game.js";

  let state = {
    squares: Array(9).fill(null),
    player_one_turn: true,
    winner: null,
    game_finished: false,
    isDraw: false,
    play_with_ai: true,
  };

  $: current_player = state.player_one_turn ? "X" : "O";

  function handleClick(i) {
    if (state.game_finished) {
      return;
    }

    state.squares[i] = current_player;

    if (handle_terminal_state(current_player)) { return }

    state.player_one_turn = !state.player_one_turn;

    if (state.play_with_ai) {
    	handle_ai_move();
    }
  }

  function handle_terminal_state(player) {
  	if (checkWinner(state.squares, player)) {
  	  state.winner = player;
  	  state.game_finished = true;
  	  return true;
  	}

  	if (isDraw(state.squares)) {
  	  state.isDraw = true;
  	  state.game_finished = true;
  	  return true;
  	}

  	return false;
  }

  function handle_ai_move() {
  	const move_index = get_move_index(state.squares);
  	state.squares[move_index] = state.player_one_turn ? "X" : "O";
  	if (handle_terminal_state(state.player_one_turn ? "X" : "O")) { return; }
  	state.player_one_turn = !state.player_one_turn;
  }

  function restartGame() {
    state = {
      squares: Array(9).fill(null),
      player_one_turn: true,
      winner: null,
      game_finished: false,
      isDraw: false,
      play_with_ai: true,
    };
  }
</script>

<main>
  <div class="board">
    {#each state.squares as cell, i }
      <div
      	class="cell"
      	class:cross="{cell === 'X'}"
      	class:circle="{cell === 'O'}"
      	on:click={() => handleClick(i)}></div>
    {/each}
  </div>

  <div
  	class="winning-message"
  	class:show="{state.game_finished}"
  	id="winningMessage"
  >
		{#if state.winner}
		  <p>{state.winner} is winner.</p>
		{/if}
		{#if state.isDraw}
		  <p>Oops game ended in draw.</p>
		{/if}
    <!-- <div data-winning-message-text></div> -->
    <button on:click={restartGame}>Restart</button>
    <!-- <button id="restartButton">Restart</button> -->
  </div>

</main>
