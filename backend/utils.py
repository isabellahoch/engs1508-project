# utils

import re
import json

def extract_number_regex(rating):
  match = re.search(r"\[(\d+)\]", rating)
  if match:
    return int(match.group(1))
  else:
    return -1

def choose_volatility_table(cicra_rating, industry):
    # Corrected mapping of industries to their volatility levels based on CICRA rating and industry-specific guidance
    industry_volatility = {
    'Standard': ['Technology', 'Aerospace & Defense', 'Automobiles & Components', 'Capital Goods', 'Consumer Durables & Apparel', 'Materials', 'Semiconductors', 'Software & Services'],
    'Medium': ['Biotech', 'Energy', 'Chemicals', 'Commercial & Professional Services', 'Consumer Services', 'Media & Entertainment', 'Pharmaceuticals', 'Retailing'],
    'Low': ['Utilities', 'Telecommunications', 'Food & Beverages', 'Healthcare Equipment', 'Banks', 'Insurance', 'Real Estate', 'Transportation']
    }

    # Determine the volatility level based on industry
    volatility_level = 'Standard'  # Default for industries not explicitly mentioned or for general assessment
    for level, industries in industry_volatility.items():
        if industry in industries:
            volatility_level = level  # Directly use the level from the corrected mapping
            break

    # Adjust for CICRA rating
    if int(cicra_rating) <= 2:
        if volatility_level == 'High Volatility':
            volatility_level = 'Standard'  # High Volatility industries default to Standard under CICRA 1 or 2
        elif volatility_level == 'Medium Volatility':
            volatility_level = 'Medial'  # Medium Volatility industries are adjusted to Medial under CICRA 1 or 2
        # No adjustment for Low Volatility industries as they are considered stable across CICRA ratings

    return volatility_level

def map_metrics_to_risk_categories(volatility_level, metrics):
    thresholds = {
        'Standard': {
            'ffo_to_debt': {'Minimal Risk [1]': (60, None), 'Modest Risk [2]': (45, 60), 'Intermediate Risk [3]': (30, 45), 'Significant Risk [4]': (20, 30), 'Aggressive Risk [5]': (12, 20), 'Highly Leveraged [6]': (None, 12)},
            'debt_to_ebitda': {'Minimal Risk [1]': (None, 1.5), 'Modest Risk [2]': (1.5, 2), 'Intermediate Risk [3]': (2, 3), 'Significant Risk [4]': (3, 4), 'Aggressive Risk [5]': (4, 5), 'Highly Leveraged [6]': (5, None)},
            'ffo_cash_interest_cover': {'Minimal Risk [1]': (13, None), 'Modest Risk [2]': (9, 13), 'Intermediate Risk [3]': (6, 9), 'Significant Risk [4]': (4, 6), 'Aggressive Risk [5]': (2, 4), 'Highly Leveraged [6]': (None, 2)},
            'ebitda_to_interest': {'Minimal Risk [1]': (15, None), 'Modest Risk [2]': (10, 15), 'Intermediate Risk [3]': (6, 10), 'Significant Risk [4]': (3, 6), 'Aggressive Risk [5]': (2, 3), 'Highly Leveraged [6]': (None, 2)},
            'cfo_to_debt': {'Minimal Risk [1]': (50, None), 'Modest Risk [2]': (35, 50), 'Intermediate Risk [3]': (25, 35), 'Significant Risk [4]': (15, 25), 'Aggressive Risk [5]': (10, 15), 'Highly Leveraged [6]': (None, 10)},
            'focf_to_debt': {'Minimal Risk [1]': (40, None), 'Modest Risk [2]': (25, 40), 'Intermediate Risk [3]': (15, 25), 'Significant Risk [4]': (10, 15), 'Aggressive Risk [5]': (5, 10), 'Highly Leveraged [6]': (None, 5)},
            'dcf_to_debt': {'Minimal Risk [1]': (25, None), 'Modest Risk [2]': (15, 25), 'Intermediate Risk [3]': (10, 15), 'Significant Risk [4]': (5, 10), 'Aggressive Risk [5]': (2, 5), 'Highly Leveraged [6]': (None, 2)},
        },
        'Medial': {
            'ffo_to_debt': {'Minimal Risk [1]': (50, None), 'Modest Risk [2]': (35, 50), 'Intermediate Risk [3]': (23, 35), 'Significant Risk [4]': (13, 23), 'Aggressive Risk [5]': (9, 13), 'Highly Leveraged [6]': (None, 9)},
            'debt_to_ebitda': {'Minimal Risk [1]': (None, 1.75), 'Modest Risk [2]': (1.75, 2.5), 'Intermediate Risk [3]': (2.5, 3.5), 'Significant Risk [4]': (3.5, 4.5), 'Aggressive Risk [5]': (4.5, 5.5), 'Highly Leveraged [6]': (5.5, None)},
            'ffo_cash_interest_cover': {'Minimal Risk [1]': (14, None), 'Modest Risk [2]': (9, 14), 'Intermediate Risk [3]': (5, 9), 'Significant Risk [4]': (2.75, 5), 'Aggressive Risk [5]': (1.75, 2.75), 'Highly Leveraged [6]': (None, 1.75)},
            'ebitda_to_interest': {'Minimal Risk [1]': (14, None), 'Modest Risk [2]': (9, 14), 'Intermediate Risk [3]': (5, 9), 'Significant Risk [4]': (2.75, 5), 'Aggressive Risk [5]': (1.75, 2.75), 'Highly Leveraged [6]': (None, 1.75)},
            'cfo_to_debt': {'Minimal Risk [1]': (40, None), 'Modest Risk [2]': (27.5, 40), 'Intermediate Risk [3]': (18.5, 27.5), 'Significant Risk [4]': (10.5, 18.5), 'Aggressive Risk [5]': (7, 10.5), 'Highly Leveraged [6]': (None, 7)},
            'focf_to_debt': {'Minimal Risk [1]': (30, None), 'Modest Risk [2]': (17.5, 30), 'Intermediate Risk [3]': (9.5, 17.5), 'Significant Risk [4]': (5, 9.5), 'Aggressive Risk [5]': (0, 5), 'Highly Leveraged [6]': (None, 0)},
            'dcf_to_debt': {'Minimal Risk [1]': (18, None), 'Modest Risk [2]': (11, 18), 'Intermediate Risk [3]': (6.5, 11), 'Significant Risk [4]': (2.5, 6.5), 'Aggressive Risk [5]': (0, 2.5), 'Highly Leveraged [6]': (None, 0)},
        },
        'Low': {
            'ffo_to_debt': {'Minimal Risk [1]': (35, None), 'Modest Risk [2]': (23, 35), 'Intermediate Risk [3]': (13, 23), 'Significant Risk [4]': (9, 13), 'Aggressive Risk [5]': (6, 9), 'Highly Leveraged [6]': (None, 6)},
            'debt_to_ebitda': {'Minimal Risk [1]': (None, 2), 'Modest Risk [2]': (2, 3), 'Intermediate Risk [3]': (3, 4), 'Significant Risk [4]': (4, 5), 'Aggressive Risk [5]': (5, 6), 'Highly Leveraged [6]': (6, None)},
            'ffo_cash_interest_cover': {'Minimal Risk [1]': (8, None), 'Modest Risk [2]': (5, 8), 'Intermediate Risk [3]': (3, 5), 'Significant Risk [4]': (2, 3), 'Aggressive Risk [5]': (1.5, 2), 'Highly Leveraged [6]': (None, 1.5)},
            'ebitda_to_interest': {'Minimal Risk [1]': (13, None), 'Modest Risk [2]': (7, 13), 'Intermediate Risk [3]': (4, 7), 'Significant Risk [4]': (2.5, 4), 'Aggressive Risk [5]': (1.5, 2.5), 'Highly Leveraged [6]': (None, 1.5)},
            'cfo_to_debt': {'Minimal Risk [1]': (30, None), 'Modest Risk [2]': (20, 30), 'Intermediate Risk [3]': (12, 20), 'Significant Risk [4]': (8, 12), 'Aggressive Risk [5]': (5, 8), 'Highly Leveraged [6]': (None, 5)},
            'focf_to_debt': {'Minimal Risk [1]': (20, None), 'Modest Risk [2]': (10, 20), 'Intermediate Risk [3]': (4, 10), 'Significant Risk [4]': (0, 4), 'Aggressive Risk [5]': (0, 0), 'Highly Leveraged [6]': (None, 0)},
            'dcf_to_debt': {'Minimal Risk [1]': (11, None), 'Modest Risk [2]': (7, 11), 'Intermediate Risk [3]': (3, 7), 'Significant Risk [4]': (0, 3), 'Aggressive Risk [5]': (0, 0), 'Highly Leveraged [6]': (None, 0)},
        },
    }

    if volatility_level not in thresholds:
        return 'Invalid volatility level'

    selected_thresholds = thresholds[volatility_level]
    risk_categories = {}

    for metric, value in metrics.items():
        # Check if the value is a string and contains a percentage sign
        if isinstance(value, str) and '%' in value:
            # If so, remove the percentage sign and convert to float
            value = float(value.strip('%')) / 100
        elif not isinstance(value, float):
            # If the value is not a float, try converting it to float
            try:
                value = float(value)
            except ValueError:
                # If conversion fails, skip this metric
                risk_categories[metric] = "Invalid value"
                continue

        # Adjust for percentages
        if metric in ['ffo_to_debt', 'cfo_to_debt', 'focf_to_debt', 'dcf_to_debt']:
          value = value * 100

        risk_category = "Unknown"  # Default risk category
        for category, ranges in selected_thresholds.get(metric, {}).items():
            lower, upper = ranges
            if (lower is None or value >= lower) and (upper is None or value < upper):
                risk_category = category
                break  # Found the matching category, no need to check further

        risk_categories[metric] = risk_category

    return risk_categories

def calculate_risk_categories(row):
    metrics = {
        'ffo_to_debt': row['ffo_to_debt_ltm'],
        'debt_to_ebitda': row['debt_to_ebitda_ltm'],
        'ffo_cash_interest_cover': row.get('ffo_interest_coverage_ltm', None), # Assuming this maps to ffo_cash_interest_cover
        'ebitda_to_interest': row['ebitda_to_interest_ltm'],
        'cfo_to_debt': row['cfo_to_debt_ltm'],
        'focf_to_debt': row['focf_to_debt_ltm'],
        'dcf_to_debt': row['dcf_to_debt_ltm'],
    }
    volatility_level = row['volatility']
    return map_metrics_to_risk_categories(volatility_level, metrics)

def extract_json_and_answer(input_str):
    # Regular expression to find JSON object within a string
    json_str_match = re.search(r'\{.*\}', input_str, re.DOTALL)

    if json_str_match:
        json_str = json_str_match.group(0)

        try:
            # Parse the JSON string into a Python dictionary
            json_obj = json.loads(json_str)

            # Extract the "answer" field from the JSON object
            answer = json_obj.get('answer', 'No answer found')

            return answer
        except json.JSONDecodeError:
            return -1 # Error parsing JSON
    else:
        return -2 # No JSON object found

def mistral_extract_output(text):
  response = text.split("[/INST]")[-1]
  response = response.split("[\INST]")[-1]
  response = response.split("[\\INST]")[-1]
  response = response.split("[//INST]")[-1]
  return response


from langchain.schema.retriever import BaseRetriever
from langchain.callbacks.manager import CallbackManagerForRetrieverRun

class CustomRetriever(BaseRetriever):

  retrievers = []

  class Config:
      arbitrary_types_allowed = True

  def set_retrievers(self, _retrievers):
    self.retrievers = _retrievers

  def _get_relevant_documents(
      self, query: str, *, run_manager: CallbackManagerForRetrieverRun
  ):
    # Use all existing retrievers to get the documents
    documents = []
    for i, retriever in enumerate(self.retrievers):
        try:
            documents.extend(retriever.get_relevant_documents(query, callbacks=run_manager.get_child(f"retriever_{i+1}")))
        except Exception as e: # in case we run into quota issues with google search, for instance
            print(e)

    return documents

  def get_relevant_documents(
      self, query: str, *, run_manager: CallbackManagerForRetrieverRun
  ):
    # Use all existing retrievers to get the documents
    documents = []
    for i, retriever in enumerate(self.retrievers):
        try:
            documents.extend(retriever.get_relevant_documents(query, callbacks=run_manager.get_child(f"retriever_{i+1}")))
        except Exception as e: # in case we run into quota issues with google search, for instance
            print(e)

    return documents

import json

def load_json(filename):
  """Loads a JSON file from the given path."""
  with open(filename, 'r') as f:
    data = json.load(f)
  return data

def load_txt(filename):
  """Loads a tab-delimited text file into a dictionary."""
  data = {}
  with open(filename, 'r') as f:
    for line in f:
      ticker, cik = line.strip().split('\t')
      data[ticker] = cik
  return data

# Load data
json_ticker_data = load_json("./data/company_tickers.json")
txt_ticker_data = load_txt("./data/ticker.txt")

def normalize_ticker_str(raw_cik):
    if len(raw_cik) == 13:
        return raw_cik
    cik = raw_cik
    while(len(cik) < 10):
        cik = '0'+cik 
    return 'CIK'+cik

def ticker_to_cik(ticker):
  """Maps a ticker symbol to its corresponding CIK from the JSON data."""
  for key, value in json_ticker_data.items():
    if value['ticker'] == ticker:
      return normalize_ticker_str(str(value['cik_str']))
  return '?'*13