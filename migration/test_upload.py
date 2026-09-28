#!/usr/bin/env python3
"""Test Supabase storage upload using anon key from .env."""
import sys, requests

def load_env():
    keys = {}
    with open('/home/krixan/Documents/tanauan/tanauan-leyte-clone/.env') as f:
        for line in f:
            line = line.strip()
            if '=' in line and not line.startswith('#'):
                k, v = line.split('=', 1)
                keys[k.strip()] = v.strip()
    return keys

env = load_env()
url = env['VITE_SUPABASE_URL']
key = env['VITE_SUPABASE_ANON_KEY']
print(f"url: {url}")
print(f"key prefix: {key[:10]}...")

# Test 1: upload small file to posts bucket
test_content = b'migration-test-file'
headers = {'Authorization': f'Bearer {key}', 'Content-Type': 'application/octet-stream'}
r = requests.post(f'{url}/storage/v1/object/posts/migration_test.txt',
                  headers=headers, data=test_content)
print('upload status:', r.status_code)
print('response:', r.text[:300])

if r.status_code in (200, 201):
    pub = f'{url}/storage/v1/object/public/posts/migration_test.txt'
    r2 = requests.get(pub)
    print('public GET:', r2.status_code, 'content:', r2.text[:100])
    # cleanup
    r3 = requests.delete(f'{url}/storage/v1/object/posts/migration_test.txt', headers={'Authorization': f'Bearer {key}'})
    print('cleanup:', r3.status_code)