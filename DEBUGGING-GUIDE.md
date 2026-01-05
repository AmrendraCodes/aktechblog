# 🔍 Debugging Guide - API Integration Issue

## 🎯 Current Status
- ✅ Dev server running: `http://localhost:8080`
- ✅ Hot Module Reload active
- ✅ API Test component added for debugging
- ✅ Console logging enabled throughout the stack

## 🔧 What I've Fixed

### 1. **Data Structure Mismatch**
**Problem**: BlogCard component expected different data structure than what API provided
**Solution**: Updated `transformArticle` to match BlogCard interface:

```javascript
// Before (❌)
{
  id: article.id,
  title: article.title,
  excerpt: article.description,
  // ... missing fields
}

// After (✅)
{
  id: article.id,
  title: article.title,
  excerpt: article.description,
  image: null,           // BlogCard expects this
  date: article.publishedAt, // BlogCard expects this
  readTime: '3 min read', // BlogCard expects this
  // ... all required fields
}
```

### 2. **Added Comprehensive Debugging**
- ✅ API service logging
- ✅ React Query hook logging  
- ✅ Component render logging
- ✅ Data transformation logging
- ✅ API Test component

## 🧪 How to Debug

### Step 1: Open Browser Console
1. Go to `http://localhost:8080`
2. Open Developer Tools (F12)
3. Go to Console tab
4. Look for these logs:

```
useArticles hook called with: {page: 1, pageSize: 6}
Query function executing...
Fetching articles from: https://genuine-fun-a6ecdb902.strapiapp.com/api/articles
API Response: {...}
Transforming response: {...}
Transformed articles: [...]
Index component render: {data: {...}, isLoading: false, error: null}
Items: [...]
```

### Step 2: Check API Test Component
At the top of the page, you'll see an "API Test Component" showing:
- Raw API response
- Number of articles found
- First article data
- Any errors

### Step 3: Network Tab
1. Go to Network tab in DevTools
2. Look for the API call to `/api/articles`
3. Check:
   - Status code (should be 200)
   - Response payload
   - Request URL

## 🚨 Common Issues & Solutions

### Issue 1: CORS Error
**Symptoms**: Console shows CORS error
**Solution**: Backend needs to allow your frontend domain

### Issue 2: Network Error  
**Symptoms**: "Network error" in console
**Solution**: Check internet connection, API URL

### Issue 3: API Response Format
**Symptoms**: Data transformation fails
**Solution**: Check actual API response structure

### Issue 4: Empty Data Array
**Symptoms**: API returns but articles array is empty
**Solution**: Check API filters, pagination

## 📊 Expected API Response

Your API should return:
```json
{
  "data": [
    {
      "id": 7,
      "title": "Beautiful picture",
      "description": "Article description...",
      "slug": "beautiful-picture", 
      "publishedAt": "2026-01-03T21:20:57.645Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 6,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

## 🎯 What to Check Now

### 1. **Console Logs**
Open browser console and look for:
- ✅ "useArticles hook called"
- ✅ "Fetching articles from" 
- ✅ "API Response"
- ✅ "Transformed articles"
- ❌ Any red error messages

### 2. **API Test Component**
Check if the test component shows:
- ✅ API response data
- ✅ Articles count > 0
- ✅ First article structure

### 3. **Network Request**
In Network tab, verify:
- ✅ Request URL is correct
- ✅ Status code 200
- ✅ Response contains data

### 4. **Article Display**
Check if articles appear:
- ✅ In API Test component
- ✅ In featured posts section
- ✅ In recent posts section

## 🔧 If Still Not Working

### Option 1: Check API URL
```javascript
// In browser console, test:
fetch('https://genuine-fun-a6ecdb902.strapiapp.com/api/articles')
  .then(r => r.json())
  .then(console.log)
```

### Option 2: Simplify API Call
Temporarily remove all filters:
```javascript
// In strapi.js, change to:
return `/articles`;
```

### Option 3: Check Environment
```javascript
// In browser console:
console.log('Environment:', import.meta.env);
console.log('API URL:', 'https://genuine-fun-a6ecdb902.strapiapp.com');
```

## 📱 Testing Steps

1. **Open**: `http://localhost:8080`
2. **Check**: Console logs for errors
3. **Verify**: API Test component shows data
4. **Confirm**: Articles appear on page
5. **Test**: Navigation and interactions

## 🎯 Success Indicators

✅ **Console shows**: "Transformed articles: [Array]"
✅ **API Test shows**: Raw API response data
✅ **Articles appear**: In featured and recent sections
✅ **No errors**: In browser console
✅ **Network shows**: 200 status for API call

## 🚨 If Issues Persist

Please provide:
1. **Console logs** (screenshot or copy)
2. **Network tab** API request/response
3. **API Test component** output
4. **Any error messages** shown

## 📞 Next Steps

Once debugging is complete:
1. **Remove** API Test component from Index.tsx
2. **Remove** console.log statements
3. **Deploy** to production
4. **Monitor** performance

---

**Current Status**: 🟡 Debugging in progress
**Server**: ✅ Running at http://localhost:8080
**API Test**: ✅ Added to page
**Logging**: ✅ Enabled throughout stack
