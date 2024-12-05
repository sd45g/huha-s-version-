export function parseJwt(token: string): {
  id: string;
  role: string;
  email: string;
  phone_number: string;
  name?: string;
} {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join(''),
  );
  const decoded = JSON.parse(jsonPayload);

  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
    phone_number: decoded.phone_number,
    name: decoded.name || 'ضيف', // تعيين اسم افتراضي إذا لم يكن موجودًا
  };
}
