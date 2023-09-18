
import { createClient } from '@supabase/supabase-js'
import { envs } from '../config/envs'

// Create a single supabase client for interacting with your database
export const supabase = createClient(envs.SUPABASE_URL, envs.SUPABASE_KEY)

export const uploadAIBucket = supabase.storage.from(envs.UPLOAD_AI_BUCKET_NAME)