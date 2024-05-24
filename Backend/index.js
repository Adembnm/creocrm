import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
//import heathRoutes from "./routes/health.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
//import notificationRoutes from "./routes/notifications.js"
//import eventRoutes from './routes/events.js'
//CRM Module
import customerRoutes from "./routes/customers.js"
import servicesRoutes from "./routes/services.js"
import ordersRoutes from "./routes/orders.js"
//mport projectsRoutes from "./routes/projects.js"
import paymentsRoutes from "./routes/payments.js"
//import productsRoutes from "./routes/products.js"
//import suppliersRoutes from "./routes/suppliers.js"
//import purshacesRoutes from "./routes/purshaces.js"
import appointmentsRoutes from "./routes/appointments.js"
//HR Module
//import employees from "./routes/employees.js"
//Ecommerce Module
//import ecommerceOrdersRoutes from "./routes/ecommerce/eorders.js"

const app = express()

dotenv.config()

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use(
  cors({
    exposedHeaders: [
      "x-pagination-count",
      "x-pagination-total",
      "x-pagination-page",
    ],
  })
)
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5002


mongoose
  .connect(CONNECTION_URL, { dbName: 'crmcreo', useNewUrlParser: true, useUnifiedTopology: true })
  .catch((error) => console.log(`${error} did not connect`))


// server.listen(PORT, () =>
app.listen(PORT, () =>
  console.log(
    `---> Server Running on Port: http://localhost:${PORT} || Database is successfully connected <---`
  )
)

//ERP SYSTEM
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

//CRM MODULE
app.use("/api/customers", customerRoutes)
app.use("/api/orders", ordersRoutes)
app.use("/api/services", servicesRoutes)
//app.use("/api/projects", projectsRoutes)
app.use("/api/payments", paymentsRoutes)
//app.use("/api/products", productsRoutes)

app.use("/api/appointments", appointmentsRoutes)
//HR MODULE

//ECOMMERCE MODULE

// Production
/*
app.use(express.static("client/build"))
app.get("*", (req, res) => {
  res.sendFile(path.resolve("client", "build", "index.html"))
})
*/

