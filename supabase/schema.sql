/** 
* USERS
* This table contains user data. Users should only be able to view and update their own data.
**/
CREATE TABLE users (
    -- UUID from auth.users
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    full_name TEXT
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Can view own user data." ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Can update own user data." ON users FOR UPDATE USING (auth.uid() = id);

/**
* This trigger automatically creates a user entry when a new user signs up via Supabase Auth.
**/ 
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER as $$
BEGIN
    INSERT INTO public.users (id, full_name)
    VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
    return new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

/**
* DONATIONS
**/
CREATE TYPE donation_kind AS ENUM ('blood', 'plasma', 'platelets', 'red_cells', 'white_cells', 'plasma_platelets');
CREATE TABLE donations (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    hemoglobin REAL,
    systolic_pressure SMALLINT,
    diastolic_pressure SMALLINT,
    volume INT,
    kind donation_kind NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT
);
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Can manage own donation data." ON donations FOR ALL USING (auth.uid() = user_id);

/**
* DISQUALIFICATIONS
**/
CREATE TABLE disqualifications (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
    hemoglobin REAL,
    systolic_pressure SMALLINT,
    diastolic_pressure SMALLINT,
    for_days INT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT
);
ALTER TABLE disqualifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Can manage own disqualification data." ON disqualifications FOR ALL USING (auth.uid() = user_id);

/**
* REALTIME SUBSCRIPTIONS
* Only allow realtime listening on public tables.
**/
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE donations, disqualifications;
