from bs4 import BeautifulSoup
import requests
import pandas as pd
import re

def ends_with_index_html(text):
  return text[-10:] == 'index.html'

def get_10k_text(cik, cutoff_date="2020-03-14"): # Default cutoff March 2020
  # Define base URL and CIK
  base_url = "https://data.sec.gov/submissions/"

  # Get main JSON data
  response = requests.get(f"{base_url}{cik}.json", headers={"User-Agent": "Mozilla/5.0"})

  data = response.json()

  # Extract recent filings data
  recent_filings = data["filings"]["recent"]

  # Convert recent filings data to pandas DataFrame
  df = pd.DataFrame(recent_filings)

  # Data cleaning
  df["filingDate"] = pd.to_datetime(df["filingDate"])

  # Define cutoff date (based on input)
  cutoff_date = pd.to_datetime(cutoff_date)

  # filtered_df = df[(df['form'] == "10-K") & (df['filingDate'] < cutoff_date)]

  filtered_df = df[(df['filingDate'] < cutoff_date)]

  if filtered_df.empty:
    filtered_df = df

  grouped_data = filtered_df.groupby('form')[['filingDate', 'accessionNumber']].max()

  grouped_data.reset_index(inplace=True)

  _accession_number = grouped_data[grouped_data['form'] == '10-K']['accessionNumber'][0] # 0001628280-16-020309

  accession_number = _accession_number.replace('-','')

  short_cik = cik.split('00')[-1]

  # define the base url needed to create the file url.
  base_url = r"https://www.sec.gov"

  # define a url that leads to a 10k document landing page
  documents_url = f"https://www.sec.gov/Archives/edgar/data/{short_cik}/{accession_number}/index.json"

  # request the url and decode it.
  content = requests.get(documents_url, headers={"User-Agent": "Mozilla/5.0"})

  content = content.json()

  for file in content['directory']['item']:

      if ends_with_index_html(file['name']):
        tenk_path = base_url + content['directory']['name'] + "/" + file['name']

      # also grab the filing summary and create a new url leading to the file
      if file['name'] == 'FilingSummary.xml':

          xml_summary = base_url + content['directory']['name'] + "/" + file['name']

  # define a new base url that represents the filing folder. This will come in handy when we need to download the reports.
  base_url = xml_summary.replace('FilingSummary.xml', '')

  # request and parse the content
  content = requests.get(tenk_path, headers={"User-Agent": "Mozilla/5.0"}).content
  soup = BeautifulSoup(content, 'lxml')

  all_links = soup.find_all('a')

  saved_links = []

  url_piece = base_url.split('.gov')[1]

  for link in all_links:
      href = link.get('href')
      if href and url_piece in href and href.endswith(".htm"):
          saved_links.append(href.split('/')[-1])

  content = requests.get(f"{base_url}{saved_links[0]}", headers={"User-Agent": "Mozilla/5.0"}).content
  soup = BeautifulSoup(content, 'lxml')

  tenk_text = soup.text.replace(u'\xa0', u' ')

  return tenk_text