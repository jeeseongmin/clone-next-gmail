import React, { useEffect, useState } from "react";

const MailContainer = () => {
	return (
		<div class="flex-1 flex flex-col w-full border border-black">
			<div class="h-10 px-2 flex justify-between items-center">
				<div class="h-full w-10 p-2 flex justify-center items-center border border-black">
					<div class="w-4 h-4 border-2 rounded-sm border-gray-500"></div>
				</div>
				<div></div>
			</div>
			<div class="h-10 px-2 flex justify-between items-center">
				<div class="h-full w-full">
					<div class="h-full w-10 p-2 flex justify-center items-center border border-black">
						<div class="w-4 h-4 border-2 rounded-sm border-gray-500"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MailContainer;
