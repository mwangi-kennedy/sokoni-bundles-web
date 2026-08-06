This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Kib Data Hub

A modern, high-performance web platform designed for browsing and purchasing discounted Safaricom and Airtel data bundles, voice minutes, SMS packages, and airtime top-ups in Kenya.

---

##  What the Platform Does

Kib Data Hub provides an intuitive, mobile-first interface for users to discover and order telco offers at rates lower than standard USSD menus.

### Key Capabilities
* **Multi-Carrier Offer Catalog:** Browse discounted Safaricom and Airtel internet bundles, voice minutes, SMS, and airtime top-ups in one unified interface.
* **Smart Category Filtering:** Instantly filter deals by type—Bulk Bundles, Minutes, Calls & Airtime, SMS, and Special Offers.
* **Okoa Jahazi Compatibility Signals:** Clear indicators highlighting packages that deliver successfully even with active Okoa Jahazi debt.
* **Quick Till Payment Flow:** Integrated display of **Buy Goods Till Number `4129381`** with 1-click copy functionality and pre-filled WhatsApp order verification.
* **Real-time Search & Discovery:** Dynamic instant search across package sizes (e.g., 1GB, 10GB, 300 Mins) and pricing tiers.

---

##  Built With

* **Frontend Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling & UI:** Tailwind CSS (Dark-Mode Tech Theme)
* **Icons:** Lucide React

---

##  Production Roadmap

The platform is currently operating as an interactive digital catalog with manual Till + WhatsApp confirmation. The next phases of development will introduce full end-to-end automation:

- [x] **Phase 1: Storefront & Catalog UI** — Dynamic bundle display, category filters, and mobile-first ordering modals.
- [ ] **Phase 2: Safaricom Daraja 3.0 API Integration** — Automated M-Pesa STK Push prompts directly on the website during checkout.
- [ ] **Phase 3: Automated Fulfillment Engine** — Integration with an automated SIM/USSD gateway to dispatch data gifts instantly upon payment confirmation.
- [ ] **Phase 4: Order Tracking & History** — Live transaction status tracking for users and an administrative dashboard for inventory and sales reconciliation.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
