document.addEventListener('DOMContentLoaded', ()=> {
	const submitForm = document.querySelector('#add-trail-form');
	const updateForm = document.querySelectorAll('form.update-trail-form');
	const deleteBtn = document.querySelectorAll('.del')

	if(submitForm) {
		submitForm.addEventListener('submit', handleFormSubmit);
	}

	if(updateForm) {
		Array.from(updateForm).forEach((el) => {
			el.addEventListener('submit', updateTrail)
		})
	}

	if(deleteBtn) {
		Array.from(deleteBtn).forEach((el)=>{
			el.addEventListener('click', deleteTrail)
		})
	}
});


// Show a notification if required fields haven't been filled
function handleFormSubmit(event) {
	const required = ['name', 'description', 'file'];
	const inputs = event.target.querySelectorAll('input[name], textarea[name]');
	const errors = [];

	for(const input of inputs) {
		const isRequired = required.includes(input.name);
		const isEmpty = input.value === '';

		if(isRequired && isEmpty) {
			errors.push(input.name);
		}
	};
};

function notify(text) {
	const notification = document.querySelector('.notification');

	notification.textContent = text;
	notification.classList.add('show');
	setTimeout(() => {
		notification.classList.remove('show');
	}, 5000, notification);
}


// Update submitted trail
async function updateTrail(event) {
	event.preventDefault(); // Prevent post request

	const fields = Array.from(event.target.querySelectorAll('input[name], textarea[name], select[name]'));
	const trailIndex = fields.findIndex(field => field.name === 'id');
  const trailId = fields.splice(trailIndex, 1)[0].value;
	const requestBody = Object.fromEntries(fields.map(field => {
		return [field.name, field.value]
	}))

	try {
    const response = await fetch(`/trails/updateTrail/${trailId}`, {
      method: 'put',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(requestBody),
    })
    location.replace(`/trails/${trailId}`);
  }
  catch (err) {
    console.error(err)
  }
}


// Delete submitted trail
/*/deleteTrail/:id */
async function deleteTrail(event){
    const trail = event.currentTarget.closest('[data-id]');
    const trailId = trail.dataset.id;
		const page = new URL(window.location);

    try{
        const response = await fetch(`/trails/deleteTrail/${trailId}`, {
            method: 'DELETE',
        });
        const data = await response;

				// If deleted on trail page there is no page to redirect to
				if(page.pathname.startsWith('/trails/')) {
        	location.replace('/profile');
				}
				else {
					location.reload();
				}
    }catch(err){
        console.error(err)
    }
}