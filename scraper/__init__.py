from main import main
import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

print(main)


# Extract command-line arguments
@app.route('/start', methods=['POST'])
def start():
    data = request.get_json()
    print(data)

    url = data.get('url')
    search_text = data.get('search_text')
    endpoint = data.get('endpoint')

    print(url, search_text, endpoint)

    # Run the scraper asynchronously
    async def run():
        await main(url, search_text, endpoint)

    asyncio.run(run())

    return jsonify({"message": f"Content succesfully scraped for: {search_text}"}), 200


app.run("scraper", 3001)