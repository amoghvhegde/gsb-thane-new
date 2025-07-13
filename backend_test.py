#!/usr/bin/env python3
"""
GSB Mandal Thane Next.js Application Backend API Testing
Tests all API endpoints and database functionality
"""

import requests
import json
import sys
from datetime import datetime

class GSBMandalAPITester:
    def __init__(self, base_url="http://localhost:9002"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            'name': name,
            'success': success,
            'details': details
        })

    def test_database_initialization(self):
        """Test database initialization endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/init-db", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get('success', False)
                details = data.get('message', '')
            else:
                details = f"HTTP {response.status_code}: {response.text}"
                
            self.log_test("Database Initialization", success, details)
            return success
            
        except Exception as e:
            self.log_test("Database Initialization", False, str(e))
            return False

    def test_get_blog_posts(self):
        """Test fetching blog posts"""
        try:
            response = requests.get(f"{self.base_url}/api/blog-posts", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get('success', False)
                if success:
                    posts = data.get('data', [])
                    details = f"Retrieved {len(posts)} blog posts"
                    # Check if sample posts exist
                    if len(posts) >= 3:
                        details += " (includes sample data)"
                else:
                    details = data.get('message', 'Unknown error')
            else:
                details = f"HTTP {response.status_code}: {response.text}"
                
            self.log_test("Get Blog Posts", success, details)
            return success, data.get('data', []) if success else []
            
        except Exception as e:
            self.log_test("Get Blog Posts", False, str(e))
            return False, []

    def test_create_blog_post(self):
        """Test creating a new blog post"""
        test_post = {
            "title": "Test Blog Post - API Test",
            "date": "February 15, 2025",
            "author": "API Tester",
            "content_html": "<p>This is a test blog post created by the API testing script.</p><p><strong>Testing functionality:</strong> Blog post creation via API.</p>",
            "image_url": "https://placehold.co/600x400/blue/white?text=Test+Post",
            "image_hint": "Test post image",
            "video_url": None
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/blog-posts",
                json=test_post,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get('success', False)
                if success:
                    created_post = data.get('data', {})
                    details = f"Created post with ID: {created_post.get('id', 'unknown')}"
                else:
                    details = data.get('message', 'Unknown error')
            else:
                details = f"HTTP {response.status_code}: {response.text}"
                
            self.log_test("Create Blog Post", success, details)
            return success
            
        except Exception as e:
            self.log_test("Create Blog Post", False, str(e))
            return False

    def test_seva_booking_submission(self):
        """Test seva booking submission"""
        test_booking = {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@test.com",
            "phone": "9876543210",
            "address": "123 Test Street, Test City, Test State - 400001",
            "selectedPoojaIds": [1, 2, 3],
            "panNumber": "ABCDE1234F",
            "donationAmount": 500,
            "totalPoojaPrice": 1500
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/seva-booking",
                json=test_booking,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get('success', False)
                if success:
                    booking = data.get('data', {})
                    details = f"Created booking with ID: {booking.get('id', 'unknown')}"
                else:
                    details = data.get('message', 'Unknown error')
            else:
                details = f"HTTP {response.status_code}: {response.text}"
                
            self.log_test("Seva Booking Submission", success, details)
            return success
            
        except Exception as e:
            self.log_test("Seva Booking Submission", False, str(e))
            return False

    def test_membership_application_submission(self):
        """Test membership application submission"""
        test_application = {
            "firstName": "Jane",
            "middleName": "M",
            "surname": "Smith",
            "gender": "Female",
            "postalAddress": "456 Test Avenue, Test City, Test State",
            "pinCode": "400002",
            "mobileNo": "9876543211",
            "email": "jane.smith@test.com",
            "dateOfBirth": "1990-05-15",
            "occupation": "Software Engineer",
            "qualification": "B.Tech Computer Science",
            "maritalStatus": "Married",
            "numChildren": 2,
            "gotra": "Test Gotra",
            "kuladevata": "Test Kuladevata",
            "math": "Kashi",
            "nativePlace": "Test Native Place",
            "otherGSBInstitutions": "Test GSB Institution",
            "membershipType": "Life",
            "introducerName": "Test Introducer",
            "declaration": True
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/membership-application",
                json=test_application,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get('success', False)
                if success:
                    application = data.get('data', {})
                    details = f"Created application with ID: {application.get('id', 'unknown')}"
                else:
                    details = data.get('message', 'Unknown error')
            else:
                details = f"HTTP {response.status_code}: {response.text}"
                
            self.log_test("Membership Application Submission", success, details)
            return success
            
        except Exception as e:
            self.log_test("Membership Application Submission", False, str(e))
            return False

    def test_invalid_data_handling(self):
        """Test API error handling with invalid data"""
        # Test invalid seva booking
        invalid_booking = {
            "firstName": "",  # Invalid: empty
            "lastName": "Test",
            "email": "invalid-email",  # Invalid: not an email
            "phone": "123",  # Invalid: too short
            "address": "",  # Invalid: empty
            "selectedPoojaIds": [],
            "totalPoojaPrice": -100  # Invalid: negative
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/seva-booking",
                json=invalid_booking,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            # Should return 400 for validation error
            success = response.status_code == 400
            
            if success:
                data = response.json()
                success = not data.get('success', True)  # Should be false for error
                details = "Correctly rejected invalid data"
            else:
                details = f"Expected 400, got {response.status_code}"
                
            self.log_test("Invalid Data Handling", success, details)
            return success
            
        except Exception as e:
            self.log_test("Invalid Data Handling", False, str(e))
            return False

    def test_database_persistence(self):
        """Test that data persists by fetching blog posts again"""
        try:
            success, posts = self.test_get_blog_posts()
            if success:
                # Should have at least 4 posts now (3 sample + 1 test post)
                success = len(posts) >= 4
                details = f"Found {len(posts)} posts (expected >= 4)"
            else:
                details = "Failed to fetch posts for persistence test"
                
            self.log_test("Database Persistence", success, details)
            return success
            
        except Exception as e:
            self.log_test("Database Persistence", False, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting GSB Mandal Thane API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test sequence
        self.test_database_initialization()
        self.test_get_blog_posts()
        self.test_create_blog_post()
        self.test_seva_booking_submission()
        self.test_membership_application_submission()
        self.test_invalid_data_handling()
        self.test_database_persistence()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("\n🎉 All tests passed! API is working correctly.")
            return 0
        else:
            print(f"\n⚠️  {self.tests_run - self.tests_passed} test(s) failed.")
            print("\nFailed tests:")
            for result in self.test_results:
                if not result['success']:
                    print(f"  - {result['name']}: {result['details']}")
            return 1

def main():
    """Main test execution"""
    tester = GSBMandalAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())