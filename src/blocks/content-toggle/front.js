Array.prototype.slice
	.call(document.getElementsByClassName("wp-block-ub-content-toggle"))
	.forEach((toggleContainer) => {
		if (!toggleContainer.hasAttribute("data-preventcollapse")) {
			let parentIsHidden = false;
			let parentClassIsHidden = false;

			let targetElement = toggleContainer;

			while (
				!(parentIsHidden || parentClassIsHidden) &&
				targetElement.parentElement.tagName !== "BODY"
			) {
				targetElement = targetElement.parentElement;
				if (targetElement.style.display === "none") {
					parentIsHidden = true;
				}

				if (getComputedStyle(targetElement).display === "none") {
					parentClassIsHidden = true;
				}
			}

			if (parentClassIsHidden || parentIsHidden) {
				toggleContainer.parentElement.style.setProperty(
					"display",
					"block", //make the parent block display to give way for height measurements
					"important" //just in case blocks from other plugins use !important
				);
			}

			Array.prototype.slice
				.call(toggleContainer.children)
				.map((p) => p.children[0])
				.forEach((instance) => {
					const indicator = instance.querySelector(
						".wp-block-ub-content-toggle-accordion-state-indicator"
					);

					const panelContent = instance.nextElementSibling;

					instance.addEventListener("click", function (e) {
						e.stopImmediatePropagation();
						let topPadding = 0;
						let bottomPadding = 0;
						if (panelContent.classList.contains("ub-hide")) {
							const panelStyle = getComputedStyle(panelContent);
							topPadding = parseInt(panelStyle.paddingTop.slice(0, -2));
							bottomPadding = parseInt(panelStyle.paddingBottom.slice(0, -2));
							panelContent.classList.remove("ub-hide");

							panelContent.classList.add("ub-hiding");
							if (
								"showonlyone" in toggleContainer.dataset &&
								toggleContainer.dataset.showonlyone
							) {
								const siblingToggles = Array.prototype.slice
									.call(toggleContainer.children)
									.map((p) => p.children[0])
									.filter((p) => p !== instance);

								siblingToggles.forEach((siblingToggle) => {
									const siblingContent = siblingToggle.nextElementSibling;
									const siblingIndicator = siblingToggle.querySelector(
										".wp-block-ub-content-toggle-accordion-state-indicator"
									);
									if (!siblingContent.classList.contains("ub-hide")) {
										if (siblingIndicator)
											siblingIndicator.classList.remove("open");
										siblingContent.classList.add("ub-toggle-transition");
										siblingContent.style.height = `${siblingContent.scrollHeight}px`;
										setTimeout(() => {
											siblingContent.classList.add("ub-hiding");
											siblingContent.style.height = "";
										}, 20);
									}
								});
							}
						} else {
							panelContent.style.height = getComputedStyle(panelContent).height;
						}
						panelContent.classList.add("ub-toggle-transition");
						if (indicator) indicator.classList.toggle("open");
						setTimeout(() => {
							//delay is needed for the animation to run properly
							if (panelContent.classList.contains("ub-hiding")) {
								Object.assign(panelContent.style, {
									height: `${
										panelContent.scrollHeight + topPadding + bottomPadding
									}px`,
									paddingTop: `${topPadding}px`,
									paddingBottom: `${bottomPadding}px`,
								});
							} else {
								panelContent.classList.add("ub-hiding");
								panelContent.style.height = "";
							}
						}, 20);

						Array.prototype.slice
							.call(panelContent.querySelectorAll(".wp-block-embed iframe"))
							.forEach((embeddedContent) => {
								embeddedContent.style.removeProperty("width");
								embeddedContent.style.removeProperty("height");
							});
					});

					panelContent.addEventListener("transitionend", function () {
						panelContent.classList.remove("ub-toggle-transition");

						if (panelContent.offsetHeight === 0) {
							panelContent.classList.add("ub-hide");
						} else {
							Object.assign(panelContent.style, {
								height: "",
								paddingTop: "",
								paddingBottom: "",
							});
						}
						panelContent.classList.remove("ub-hiding");
					});

					panelContent.removeAttribute("style");
				});

			//hide the parent element again;
			if (parentIsHidden) {
				toggleContainer.parentElement.style.display = "none";
			}

			if (parentClassIsHidden) {
				toggleContainer.parentElement.style.display = "";
			}
		}
	});
