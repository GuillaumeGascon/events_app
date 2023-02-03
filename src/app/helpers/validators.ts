import { Validators } from "@angular/forms";
import { passwordRegexp } from "./regexp";

export const passwordValidator = Validators.pattern(passwordRegexp);
