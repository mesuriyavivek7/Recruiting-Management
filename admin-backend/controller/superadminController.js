import ACCOUNTMANAGER from "../models/ACCOUNTMANAGER.js";

export const getAllVerifiedEnterprise = async (req, res, next) => {
    try {
        // Fetch all account managers
        const accountManagers = await ACCOUNTMANAGER.find({ admin_type: "account_manager" });

        // Merge all `verified_enterprise` arrays
        const mergedEnterprises = accountManagers
            .map(manager => manager.verified_enterprise) // Extract `verified_enterprise` arrays
            .flat(); // Merge into a single array

        // Remove duplicates
        const uniqueEnterprises = [...new Set(mergedEnterprises)];

        res.status(200).json({
            success: true,
            data: uniqueEnterprises
        });
    } catch (error) {
        next(error);
    }
}
