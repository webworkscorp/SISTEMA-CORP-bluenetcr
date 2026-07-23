const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const replacement = `
    const handlePasswordReset = async () => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: \`\${window.location.origin}/?type=recovery\`,
            });
            if (error) throw error;
            alert('Se ha enviado un enlace a tu correo para restablecer la contraseña.');
        } catch (error: any) {
            console.error('Error enviando correo de restablecimiento:', error.message);
            alert('Hubo un error al enviar el enlace. Inténtalo de nuevo.');
        }
    };

    const handleSaveProfile = async () => {
`;

code = code.replace(/const handleSaveProfile = async \(\) => \{/, replacement);
fs.writeFileSync('src/App.tsx', code);
