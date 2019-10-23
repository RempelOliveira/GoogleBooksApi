function formValidate(form)
{
	let errors = {};

	Object.keys(form).map((item) =>
	{
		if(item !== "errors")
		{
			let value 	   = form[item].value.toString().trim(),
				validation = form[item].validation;

			if(validation)
			{
				if(validation.required && !value)
				{
					errors[item] = validation.code ? "All code fields are required" : "Required";

				}
				else if(validation.surname && value.indexOf(" ") === -1)
				{
					errors[item] = "Name and surname must be entered";

				}
				else if(value && validation.min && value.length < validation.min)
				{
					errors[item] = "Enter at least " + validation.min + " characters";

				}
				else if(value && validation.max && value.length > validation.max)
				{
					errors[item] = "Enter a maximum of " + validation.max + " characters";

				}
				else if(validation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
				{
					errors[item] = "Invalid email address";

				}

			}

		}

		return form;

	});

	return Object.keys(errors).length
		? errors : true;

}

export default formValidate;