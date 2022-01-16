/** Form Validation rule for UI */
type GameWordFormValidationRule = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'required' | 'minLength' | 'maxLength' | 'pattern'
>;

export const GetGameWordValidationRule: GameWordFormValidationRule = {
  name: 'gameWord',
  required: true,
  minLength: 6,
  maxLength: 7,
  pattern: '^[A-Z]{6,7}$',
};
