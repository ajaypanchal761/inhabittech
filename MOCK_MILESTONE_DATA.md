# Mock Milestone Data for Admin Panel

This file contains sample milestone data that can be used to create milestones in the admin panel for the "Our Journey" section.

**Note:** Milestones are displayed in a timeline format. The `position` field determines whether the milestone appears on the left or right side of the timeline (alternating pattern).

---

## Milestone 1: Company Founded

```json
{
  "year": "2015",
  "title": "Company Founded",
  "description": "InHabitTech was founded with a vision to revolutionize hotel technology solutions. Started with a small team of passionate developers and hospitality experts.",
  "position": "left",
  "order": 1,
  "isActive": true
}
```

---

## Milestone 2: First Major Client

```json
{
  "year": "2016",
  "title": "First Major Client",
  "description": "Secured our first major hotel chain client with 10+ properties. Successfully implemented integrated hotel management systems across all locations.",
  "position": "right",
  "order": 2,
  "isActive": true
}
```

---

## Milestone 3: Cloud Migration Services

```json
{
  "year": "2017",
  "title": "Cloud Migration Services",
  "description": "Launched cloud migration services, helping hotels transition from on-premise to cloud infrastructure. Completed 50+ successful migrations.",
  "position": "left",
  "order": 3,
  "isActive": true
}
```

---

## Milestone 4: AI Integration Launch

```json
{
  "year": "2018",
  "title": "AI Integration Launch",
  "description": "Introduced AI-powered solutions including chatbots and virtual concierge services. Achieved 85% query resolution rate without human intervention.",
  "position": "right",
  "order": 4,
  "isActive": true
}
```

---

## Milestone 5: International Expansion

```json
{
  "year": "2019",
  "title": "International Expansion",
  "description": "Expanded operations to serve clients across 15 countries. Opened offices in London, Singapore, and Dubai to better serve global hotel chains.",
  "position": "left",
  "order": 5,
  "isActive": true
}
```

---

## Milestone 6: 100+ Hotel Clients

```json
{
  "year": "2020",
  "title": "100+ Hotel Clients",
  "description": "Reached milestone of serving 100+ hotel properties worldwide. Despite challenges, continued to deliver exceptional service and support to our clients.",
  "position": "right",
  "order": 6,
  "isActive": true
}
```

---

## Milestone 7: Mobile App Platform

```json
{
  "year": "2021",
  "title": "Mobile App Platform",
  "description": "Launched comprehensive mobile app development platform for hotels. Developed apps with 50,000+ downloads and seamless guest experience.",
  "position": "left",
  "order": 7,
  "isActive": true
}
```

---

## Milestone 8: IoT Smart Room Solutions

```json
{
  "year": "2022",
  "title": "IoT Smart Room Solutions",
  "description": "Introduced IoT smart room solutions enabling hotels to offer personalized guest experiences. Implemented across 200+ rooms, reducing energy consumption by 25%.",
  "position": "right",
  "order": 8,
  "isActive": true
}
```

---

## Milestone 9: Data Analytics Platform

```json
{
  "year": "2023",
  "title": "Data Analytics Platform",
  "description": "Launched comprehensive data analytics platform providing real-time insights and predictive analytics. Helped hotels optimize revenue and improve operational efficiency.",
  "position": "left",
  "order": 9,
  "isActive": true
}
```

---

## Milestone 10: 500+ Projects Completed

```json
{
  "year": "2024",
  "title": "500+ Projects Completed",
  "description": "Celebrated completion of 500+ successful projects across various hotel technology domains. Continued commitment to innovation and excellence in hospitality technology.",
  "position": "right",
  "order": 10,
  "isActive": true
}
```

---

## Milestone 11: Industry Recognition

```json
{
  "year": "2024",
  "title": "Industry Recognition",
  "description": "Received 'Best Hotel Technology Provider' award at the Global Hospitality Technology Summit. Recognized for innovation and excellence in hotel IT solutions.",
  "position": "left",
  "order": 11,
  "isActive": true
}
```

---

## Milestone 12: Future Vision

```json
{
  "year": "2025",
  "title": "Future Vision",
  "description": "Expanding into emerging technologies including blockchain, AR/VR, and advanced AI. Committed to shaping the future of hospitality technology.",
  "position": "right",
  "order": 12,
  "isActive": true
}
```

---

## Usage Instructions

1. **Create Milestones:**
   - Go to Admin Panel → Milestones → Add New Milestone
   - Fill in the form fields using the mock data above
   - Set the `position` field to alternate between "left" and "right" for timeline display
   - Set the `order` field to control chronological order (lower numbers = earlier years)
   - Submit the form

2. **Fields Explanation:**
   - **year**: Year of the milestone (required, e.g., "2015", "2024")
   - **title**: Milestone title/heading (required)
   - **description**: Detailed description of the milestone (required)
   - **position**: Timeline position - "left" or "right" (required, alternate for visual effect)
   - **order**: Display order (number, lower = appears first chronologically)
   - **isActive**: Whether milestone is active (checkbox)

3. **Timeline Display:**
   - Milestones are displayed in a timeline format
   - The `position` field alternates between "left" and "right" to create a zigzag timeline effect
   - The `order` field determines the chronological sequence
   - Milestones are sorted by `order` field (ascending)

4. **Best Practices:**
   - Start with `order: 1` for the earliest milestone
   - Increment `order` by 1 for each subsequent milestone
   - Alternate `position` between "left" and "right" for visual balance
   - Use clear, concise titles
   - Keep descriptions informative but brief (2-3 sentences)

---

## Quick Copy-Paste Format

For easy copy-paste, here's a simplified version:

**Milestone 1:**
- Year: 2015
- Title: Company Founded
- Description: InHabitTech was founded with a vision to revolutionize hotel technology solutions...
- Position: left
- Order: 1

**Milestone 2:**
- Year: 2016
- Title: First Major Client
- Description: Secured our first major hotel chain client with 10+ properties...
- Position: right
- Order: 2

**Milestone 3:**
- Year: 2017
- Title: Cloud Migration Services
- Description: Launched cloud migration services, helping hotels transition...
- Position: left
- Order: 3

---

## Timeline Display Pattern

For a visually appealing timeline, follow this pattern:

```
Year 2015 (left)  →  Year 2016 (right)  →  Year 2017 (left)  →  Year 2018 (right)
```

This creates an alternating zigzag pattern that's visually engaging.

---

**Note:** The milestones will be displayed on the "Our Journey" section of the About Us page in chronological order based on the `order` field.

