<template>
	<div id="app">
		<m-header></m-header>
		<m-tab></m-tab>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<player></player>
	</div>
</template>

<script>
import MHeader from './components/m-header/MHeader';
import MTab from './components/m-tab/MTab';
import Player from './components/player/Player';
export default {
	name: 'App',
	components: {
		MHeader,
		MTab,
		Player
	}
}

</script>

<style lang="scss">
@import url('./common/style/font.css');
@import url('./common/style/reset.css');
.fade-enter-active,
.fade-leave-active {
	transition: all .3s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>