# 🏗️ Enterprise Wedding Invitation System - Technical Architecture

## 📋 **PROJECT OVERVIEW**

Transformasi aplikasi wedding invitation menjadi enterprise multi-tenant system dengan:
- **Multi-tenant hierarchy**: Super Admin → Wedding Planner Agencies → Wedding Couples
- **Database migration**: Supabase → PostgreSQL lokal + JWT auth
- **DnD system**: Visual editor untuk template creation + section arrangement untuk customization
- **Payment system**: Manual transfer + online payment gateway integration
- **Enterprise features**: Pricing packages, tenant management, plugin system

## 🏢 **MULTI-TENANT ARCHITECTURE**

### **Hierarchy Structure**
```
Super Admin (Platform Owner)
├── Wedding Planner Agency A
│   ├── Wedding Couple 1
│   │   └── Wedding Guests
│   └── Wedding Couple 2
│       └── Wedding Guests
└── Wedding Planner Agency B
    ├── Wedding Couple 3
    └── Wedding Couple 4
```

### **Database Schema Design**
```sql
-- Core multi-tenant tables
tenants (id, name, type, subscription_status, created_at)
tenant_users (id, tenant_id, user_id, role, permissions, created_at)
user_roles (id, name, permissions, tenant_scope)
permissions (id, resource, action, description)

-- Wedding-specific tables (tenant-scoped)
wedding_templates (id, tenant_id, name, config, created_by)
wedding_instances (id, tenant_id, template_id, couple_id, status)
wedding_customizations (id, wedding_id, section, config, updated_at)

-- Payment & billing tables
payment_plans (id, name, features, price, billing_cycle)
tenant_subscriptions (id, tenant_id, plan_id, status, expires_at)
payment_transactions (id, tenant_id, amount, method, status, gateway_ref)
```

## 🎨 **DnD SYSTEM ARCHITECTURE**

### **Template Creation (Visual Editor)**
- Canvas-based drag-drop interface
- Component library: text, images, shapes, backgrounds
- Layer management and z-index control
- Style editor: colors, fonts, spacing, animations
- Real-time preview with responsive breakpoints
- Template versioning and publishing workflow

### **Template Customization (Section Arrangement)**  
- Pre-built sections: Hero, Couple, Timeline, Events, RSVP, Gallery
- Drag-drop to reorder sections
- Content editor for text/image replacement
- Theme customization: colors, fonts, layouts
- Live preview with instant updates

### **Technical Stack**
```typescript
// Frontend DnD Libraries
- @dnd-kit/core // Modern drag-drop
- fabric.js // Canvas manipulation for visual editor
- react-konva // 2D canvas library
- framer-motion // Animations

// Template Engine
- handlebars.js // Template compilation
- css-tree // CSS parsing and generation  
- postcss // CSS transformations
```

## 🔐 **AUTHENTICATION & AUTHORIZATION**

### **JWT Token Structure**
```json
{
  "sub": "user_id",
  "tenant_id": "tenant_uuid", 
  "role": "super_admin|agency_admin|couple|guest",
  "permissions": ["create_templates", "manage_users"],
  "iat": 1640995200,
  "exp": 1641081600
}
```

### **Role-Based Access Control**
- **Super Admin**: Platform management, all tenants access
- **Agency Admin**: Manage agency users, templates, couples
- **Couple**: Manage wedding details, customize templates
- **Guest**: View invitation, RSVP functionality

## 💳 **PAYMENT SYSTEM ARCHITECTURE**

### **Payment Flow**
```
1. Package Selection → 2. Payment Method → 3. Gateway Processing → 4. Confirmation → 5. Service Activation
```

### **Supported Payment Methods**
- **Manual Transfer**: Bank transfer dengan upload bukti
- **Online Payment**: Midtrans/Xendit integration
- **Subscription Billing**: Recurring payments untuk agencies

## 🎯 **DEVELOPMENT METHODOLOGY**

### **Test-First Approach**
```javascript
// Example test structure
describe('TenantService', () => {
  describe('createTenant', () => {
    it('should create tenant with valid data', async () => {
      // Red: Write failing test first
      const result = await TenantService.create(validTenantData);
      expect(result).toHaveProperty('id');
    });
  });
});
```

### **Chunked Development Protocol**
1. **Red**: Write failing test for specific functionality
2. **Green**: Write minimum code to make test pass  
3. **Refactor**: Clean up code while maintaining tests
4. **Document**: Update progress documentation
5. **Review**: Code review before next chunk

### **Documentation Standards**
- Each chunk completion documented in `docs/DEVELOPMENTS/ON_PROGRESS/`
- API endpoints documented with OpenAPI/Swagger
- Database schema changes tracked with migrations
- Architecture decisions recorded with context

## 📊 **PERFORMANCE & SCALABILITY**

### **Database Optimization**
- Proper indexing untuk multi-tenant queries
- Connection pooling for high concurrency
- Query optimization dengan EXPLAIN ANALYZE
- Caching strategy dengan Redis

### **Frontend Optimization** 
- Code splitting per route and role
- Image optimization dan lazy loading
- Service worker untuk offline capability
- Bundle analysis dan tree shaking

## 🔒 **SECURITY CONSIDERATIONS**

### **Multi-Tenant Security**
- Row Level Security (RLS) policies
- Tenant data isolation validation
- API endpoint tenant context validation
- Audit logging untuk compliance

### **Application Security**
- Input sanitization dan validation
- SQL injection prevention
- XSS protection with CSP headers
- Rate limiting per tenant
- File upload security scanning

## 📈 **MONITORING & ANALYTICS**

### **System Monitoring**
- Application performance monitoring
- Database query performance
- Error tracking dan alerting
- Uptime monitoring

### **Business Analytics**
- Tenant usage metrics
- Template popularity tracking
- Payment conversion rates
- User engagement analytics

---

**Last Updated**: 2025-08-12  
**Status**: Architecture Planning Complete  
**Next Phase**: Implementation Fase 1A - Database Architecture