# 1) ใช้ Node image
FROM node:18

# 2) สร้างโฟลเดอร์ทำงาน
WORKDIR /app

# 3) คัดลอกไฟล์จัดการ package
COPY package*.json ./

# 4) ติดตั้ง dependencies
RUN npm install

# 5) คัดลอกไฟล์ทั้งหมดในโปรเจกต์ (แก้ไขจากเดิมที่เขียนแยกบรรทัด)
COPY . .

# 6) เปิด port 3000 ตามที่ระบุใน .env
EXPOSE 3000

# 7) รัน server
CMD ["node", "app.js"] 

