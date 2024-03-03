import finnhub
import os
from datetime import date, timedelta

from dotenv import load_dotenv

load_dotenv()

finnhub_api_key = os.environ.get("FINNHUB_API_KEY")

finnhub_client = finnhub.Client(api_key=finnhub_api_key)

def get_finnhub_info(ticker):

  # time range: last 10 days, but taking tomorrow's date as 'end' to capture international markets
  today = date.today()
  tomorrow = today + timedelta(days=1)
  ten_days_ago = today - timedelta(days=10)
  tomorrow_formatted = tomorrow.strftime('%Y-%m-%d')
  ten_days_ago_formatted = ten_days_ago.strftime('%Y-%m-%d')

  news = finnhub_client.company_news(ticker, _from=ten_days_ago_formatted, to=tomorrow_formatted)

  quote = finnhub_client.quote(ticker)
  
  peers = finnhub_client.company_peers(ticker)

  return {"news": news, "quote": quote, "peers": peers}