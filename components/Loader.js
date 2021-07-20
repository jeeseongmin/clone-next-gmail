import loading from "../public/image/Loading.svg";

export default function Loader() {
	return (
		<div class="flex absolute top-0 h-full">
			<img src="loading.svg" class="inline-block m-auto- w-20" />
		</div>
	);
}
