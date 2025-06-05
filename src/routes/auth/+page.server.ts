import { redirect } from '@sveltejs/kit'

import type { Actions } from './$types'

export const actions: Actions = {
  register: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, '/auth')
    }
  },
  login: async ({ request, locals: { supabase } }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      console.error(error)
      redirect(303, '/auth/error')
    } else {
      redirect(303, `/private/users/dashboard/user`)
    }
  },
  loginWithX: async ({url, request, locals: { supabase }}) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: `${url.origin}/auth/callback?next=/private/users/dashboard/user`,
      },
    });
    if(error) {
      console.error(error)
      redirect(303, "/auth/error")
    };
    if (data.url) {
      throw redirect(303, data.url);
    }
  }
}