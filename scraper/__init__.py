from main import main
import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os

logging.basicConfig(level=logging.DEBUG)

debug = bool(os.environ.get("DEBUG"))
print(debug)

app = Flask(__name__)
CORS(app)

print(f"{__name__} running ... ")


# Extract command-line arguments
@app.route('/start', methods=['POST'])
def start():
    app.logger.info('/start in init.py')
    data = request.get_json(force=True)

    url = data.get('url')
    search_text = data.get('search_text')
    endpoint = data.get('endpoint')
    user_id = data.get('user_id')

    app.logger.info(
        f"url: {url}, search_text: {search_text}, endpoint: {endpoint}, user_id: {user_id}")

    # Run the scraper asynchronously
    async def run():
        await main(url, search_text, endpoint, user_id)

    asyncio.run(run())

    return jsonify({"message": f"Content succesfully scraped for: {search_text}"}), 200


app.run("scraper", 3001, debug=debug)
