# Import Module
import json

# Create geeks function


def print_json():

	# Define Variable
	language = "English"
	company = "QUT"
	Itemid = 1
	price = 0.00

	# Create Dictionary
	value = {
		"language": language,
		"company": company,
		"Itemid": Itemid,
		"price": price
	}

	# Dictionary to JSON Object using dumps() method
	# Return JSON Object
	return json.dumps(value)

print(print_json())