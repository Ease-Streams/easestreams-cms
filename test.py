import csv
import requests

# Replace with your CSV file path
data_file = "List_of_companies_in_India.csv"

# Set the API endpoint URL
url = "http://localhost:3000/api/products"
headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Authorization": "users API-Key f63c5205-495b-4fc9-913a-770f9b21d700" 
}

# Open the CSV file
with open(data_file, "r", encoding="Latin-1") as f:
  # Create a CSV reader object
  reader = csv.DictReader(f)

  # Loop through each row (record) in the CSV
  for row in reader:
    # Send POST request with product data
    if row['name']==None:
        row['name']='Product'
    if row['productCode']==None:
        row['productCode']='productCode'
    if row['description']==None:
        row['description']='description'
    try:
      
      response = requests.post(url,headers=headersList, json=row,)

      # Check for successful response
      if response.status_code == 201:
        print(f"Product created successfully: {row['name']}")  # Assuming 'name' is a field
      else:
        print(f"Error creating product: {row['name'] if 'name' in row else 'Unknown'} ({response.status_code})")
        print(response.text)  # Optional: Print error details from the response
    except:
      print("error")
      continue

print("Finished processing all products in", data_file)

