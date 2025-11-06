import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(
    props: ImgHTMLAttributes<HTMLImageElement>,
) {
    return (
        <img
            src="/images/mega-logo.png"
            alt="App Logo"
            width={40}
            height={42}
            style={{ backgroundColor: 'transparent' }}
            {...props}
        />
    );
}
