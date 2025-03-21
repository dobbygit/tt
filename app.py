from flask import Flask, render_template, request, jsonify, send_from_directory
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, 
           static_folder='static',
           template_folder='templates')

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/why-us')
def why_us():
    return render_template('why_us.html')

@app.route('/rental')
def rental():
    return render_template('rental.html')

@app.route('/product/<id>')
def product(id):
    # In a real app, you would fetch product data based on id
    return render_template('product.html', product_id=id)

# API routes
@app.route('/api/hello', methods=['GET'])
def hello_api():
    return jsonify({"message": "Hello from Python API!"})

@app.route('/api/contact', methods=['POST'])
def contact_api():
    data = request.json
    # Process contact form submission
    # In a real app, you would send emails, save to database, etc.
    return jsonify({"success": True, "message": "Contact form submitted successfully"})

# Static files
@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('static/images', filename)

if __name__ == '__main__':
    app.run(debug=True, port=3000)
