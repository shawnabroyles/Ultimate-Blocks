function ub_getSiblings(element, criteria) {
	const children = Array.from(element.parentNode.children).filter(
		child => child !== element
	);
	return criteria ? children.filter(criteria) : children;
}

Array.from(document.getElementsByClassName('ub-content-filter-tag')).forEach(
	instance => {
		instance.addEventListener('click', function() {
			const blockProper = this.closest('.wp-block-ub-content-filter');
			const isOldVersion = this.getAttribute('data-activecolor');
			this.setAttribute(
				'data-tagisselected',
				JSON.stringify(
					!JSON.parse(this.getAttribute('data-tagisselected'))
				)
			);
			if (isOldVersion) {
				this.style.backgroundColor = this.getAttribute(
					'data-activecolor'
				);
				this.style.color = this.getAttribute('data-activetextcolor');
			} else {
				this.classList.toggle('ub-selected');
			}
			const categoryIndex = JSON.parse(
				this.getAttribute('data-categorynumber')
			);
			const filterIndex = JSON.parse(
				this.getAttribute('data-filternumber')
			);

			if (JSON.parse(this.getAttribute('data-tagisselected'))) {
				if (
					!JSON.parse(
						this.parentElement.getAttribute('data-canusemultiple')
					)
				) {
					ub_getSiblings(this, elem =>
						elem.classList.contains('ub-content-filter-tag')
					).forEach(sibling => {
						sibling.setAttribute('data-tagisselected', 'false');
						if (isOldVersion) {
							sibling.style.backgroundColor = this.getAttribute(
								'data-normalcolor'
							);
							sibling.style.color = this.getAttribute(
								'data-normaltextcolor'
							);
						} else {
							sibling.classList.remove('ub-selected');
						}
					});
				}
			} else {
				if (isOldVersion) {
					this.style.backgroundColor = this.getAttribute(
						'data-normalcolor'
					);
					this.style.color = this.getAttribute(
						'data-normaltextcolor'
					);
				} else {
					this.classList.remove('ub-selected');
				}
			}
			let newSelection = JSON.parse(
				blockProper.getAttribute('data-currentselection')
			);
			if (Array.isArray(newSelection[categoryIndex])) {
				newSelection[categoryIndex][filterIndex] = JSON.parse(
					this.getAttribute('data-tagisselected')
				);
			} else {
				newSelection[categoryIndex] = JSON.parse(
					this.getAttribute('data-tagisselected')
				)
					? filterIndex
					: -1;
			}
			blockProper.setAttribute(
				'data-currentselection',
				JSON.stringify(newSelection)
			);

			Array.from(
				blockProper.getElementsByClassName('ub-content-filter-panel')
			).forEach(instance => {
				const panelData = JSON.parse(
					instance.getAttribute('data-selectedfilters')
				);
				const mainData = JSON.parse(
					blockProper.getAttribute('data-currentselection')
				);

				let isVisible = true;

				panelData.forEach((category, i) => {
					if (Array.isArray(category)) {
						if (
							mainData[i].filter(f => f).length > 0 &&
							category.filter((f, j) => f && f === mainData[i][j])
								.length === 0
						) {
							isVisible = false;
						}
					} else {
						if (mainData[i] !== category && mainData[i] !== -1) {
							isVisible = false;
						}
					}
				});

				if (isOldVersion) {
					instance.style.display = isVisible ? 'block' : 'none';
				} else if (isVisible) {
					instance.classList.remove('ub-hide');
				} else {
					instance.classList.add('ub-hide');
				}
			});
		});
	}
);

/*Array.from(document.getElementsByClassName('ub-content-filter-reset')).forEach(
	instance => {
		instance.addEventListener('click', function() {
			const blockProper = this.closest('.wp-block-ub-content-filter');

			let blockSelection = JSON.parse(
				blockProper.getAttribute('data-currentselection')
			);

			blockSelection = blockSelection.map(c =>
				Array.isArray(c) ? Array(c.length).fill(false) : -1
			);

			blockProper.setAttribute(
				'data-currentselection',
				JSON.stringify(blockSelection)
			);

			Array.from(
				blockProper.getElementsByClassName('ub-content-filter-panel')
			).forEach(instance => {
				instance.style.display = 'block';
			});

			Array.from(
				blockProper.getElementsByClassName('ub-content-filter-tag')
			).forEach(instance => {
				instance.setAttribute('data-tagisselected', 'false');
				instance.style.backgroundColor = instance.getAttribute(
					'data-normalcolor'
				);
				instance.style.color = instance.getAttribute(
					'data-normaltextcolor'
				);
			});
		});
	}
);*/
