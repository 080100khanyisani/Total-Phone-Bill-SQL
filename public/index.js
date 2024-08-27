document.addEventListener('alpine:init', () => {
    Alpine.data('phoneBillManager', () => ({
        pricePlans: [],
        newPlan: { name: '', call_cost: '', sms_cost: '' },
        billPlan: '',
        actions: '',
        totalPhoneBill: 0,
        showAllPlans: false, // Variable to control the visibility of the price plans table

        init() {
            this.fetchPricePlans();
        },

        async fetchPricePlans() {
            try {
                const response = await fetch('/api/price_plans');
                const data = await response.json();
                console.log('Fetched price plans:', data.result);
                this.pricePlans = data.result;
            } catch (error) {
                console.error('Error fetching price plans:', error);
            }
        },

        async createPricePlan() {
            try {
                await fetch('/api/price_plan/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newPlan)
                });
                this.newPlan = { name: '', call_cost: '', sms_cost: '' };
                this.fetchPricePlans();
            } catch (error) {
                console.error('Error creating price plan:', error);
            }
        },

        async updatePricePlan(plan) {
            try {
                await fetch('/api/price_plan/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(plan)
                });
                this.fetchPricePlans();
            } catch (error) {
                console.error('Error updating price plan:', error);
            }
        },

        async deletePricePlan(id) {
            try {
                await fetch('/api/price_plan/delete', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id })
                });
                this.fetchPricePlans();
            } catch (error) {
                console.error('Error deleting price plan:', error);
            }
        },

        async calculatePhoneBill() {
            try {
                const response = await fetch('/api/phonebill/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ price_plan: this.billPlan, actions: this.actions })
                });
                const data = await response.json();
                this.totalPhoneBill = data.totalphonebill;
            } catch (error) {
                console.error('Error calculating phone bill:', error);
            }
        }
    }));
});
