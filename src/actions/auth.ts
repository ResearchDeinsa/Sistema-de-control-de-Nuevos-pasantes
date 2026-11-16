"use server";

import { createClient } from "@/src/lib/supabase/server";

export async function login(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }
  return {
    suscess: true,
    message: "Inicio de sesión exitoso",
    data: data,
  };
}

export async function signup(formData: {
  name: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error, data } = await supabase.auth.signUp(formData);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    suscess: true,
    message: "Registro exitoso",
    data: data,
  };
}
export async function forgotPassword(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    suscess: true,
    message: "Instrucciones para restablecer la contraseña enviadas",
  };
}
