function extractRoleAndStore() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        try {
            const tokenParts = accessToken.split('.');

            if (tokenParts.length !== 3) {
                throw new Error('Invalid token format');
            }

            const payload = JSON.parse(atob(tokenParts[1]));

            const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

            if (role) {
                sessionStorage.setItem('userRole', role);
            }

            return { accessToken: payload, role: role };
        } catch (error) {
            return { accessToken: null, role: null };
        }
    }

    return { accessToken: null, role: null };
}

export default extractRoleAndStore;
