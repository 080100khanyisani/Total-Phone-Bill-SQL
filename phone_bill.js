export function totalPhoneBill(actions, callCost, smsCost) {
    let total = 0;

    // Split the actions string into an array of actions
    const actionList = actions.split(',');

    // Iterate through each action
    for (const action of actionList) {
        const trimmedAction = action.trim().toLowerCase();

        // Add the appropriate cost based on the action type
        if (trimmedAction === 'call') {
            total += callCost;
        } else if (trimmedAction === 'sms') {
            total += smsCost;
        }
    }

    // Return the total cost
    return total;
}
