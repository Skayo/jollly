module.exports = window.angular.module('FileRead', []).directive('fileread', [
	'AlertManager',
	function(AlertManager) {
		return {
			link: function(scope, element, attributes) {
				function changeUi(lang) {
					if (lang === 'lhs') {
						document
							.querySelector('label.lhs')
							.classList.add('disabled')
						document
							.querySelector('input.lhs')
							.setAttribute('disabled', 'disabled')
						document
							.querySelector('label.rhs')
							.classList.remove('disabled')
						document
							.querySelector('input.rhs')
							.removeAttribute('disabled')
						document
							.querySelector('label.rhs')
							.classList.remove('disabled')
						document
							.querySelector('input.rhs')
							.removeAttribute('disabled')
					} else if (lang === 'rhs') {
						document
							.querySelector('input.rhs')
							.setAttribute('disabled', 'disabled')
					}
				}

				element.bind('change', function(changeEvent) {
					var reader = new window.FileReader()
					reader.onload = function(loadEvent) {
						scope.$apply(function() {
							try {
								scope.fileread = JSON.parse(
									loadEvent.target.result
								)
							} catch (e) {
								if (e.stack.startsWith('SyntaxError')) {
									AlertManager.add({
										type: 'danger',
										msg: 'Syntax Error: ' + e.message
									})
								}

								console.error('JSON Exception', e)
								return false
							}

							changeUi(attributes.fileread)
							console.log(attributes.fileread)
							console.log(scope.fileread)
							scope.$emit('filereaded', {
								datas: scope.fileread,
								state: attributes.fileread,
								filename: changeEvent.target.files[0].name
							})
						})
					}
					reader.readAsText(changeEvent.target.files[0])
				})
			}
		}
	}
]).name
