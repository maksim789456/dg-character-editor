import createMiddleware from 'next-intl/middleware';
import {routing} from './src/i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  matcher: [
    // Only empty or with lang code url's
    "/([a-z]{2}$)",
    "/"
  ],
};