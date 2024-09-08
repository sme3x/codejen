<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Users>
 */
class UsersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'client_id' => fake()->sentence(),
            'salesforce_id' => fake()->sentence(),
            'manualm_merge' => fake()->sentence(),
            'sf_campaign_id' => fake()->sentence(),
            'promo_code_id' => fake()->sentence(),
            'promo_code_inserted' => fake()->sentence(),
            'contact_source' => fake()->sentence(),
            'first_name' => fake()->sentence(),
            'last_name' => fake()->sentence(),
            'address' => fake()->sentence(),
            'postal_code' => fake()->sentence(),
            'city' => fake()->sentence(),
            'country' => fake()->sentence(),
            'phone' => fake()->sentence(),
            'phone2' => fake()->sentence(),
            'email' => fake()->sentence(),
            'birthday' => fake()->sentence(),
            'client_sex' => fake()->sentence(),
            'brand_id' => fake()->sentence(),
            'domain' => fake()->sentence(),
            'lang' => fake()->sentence(),
            'source_table' => fake()->sentence(),
            'source_id' => fake()->sentence(),
            'vin' => fake()->sentence(),
            'model_code' => fake()->sentence(),
            'model_index' => fake()->sentence(),
            'registration_plate_nr' => fake()->sentence(),
            'categories' => fake()->sentence(),
            'small_note' => fake()->sentence(),
            'bounced' => fake()->sentence(),
            'bounced_last_datetime' => fake()->sentence(),
            'enewsdisable' => fake()->sentence(),
            'enewsdisable_datetime' => fake()->sentence(),
            'email_status' => fake()->sentence(),
            'phonedisable' => fake()->sentence(),
            'phonedisable_datetime' => fake()->sentence(),
            'phone_status' => fake()->sentence(),
            'profiling' => fake()->sentence(),
            'profiling_datetime' => fake()->sentence(),
            'manual_signup' => fake()->sentence(),
            'employee_id' => fake()->sentence(),
            'employee_name' => fake()->sentence(),
            'cost_carrier_id' => fake()->sentence(),
            'anonymous' => fake()->sentence(),
            'company_id' => fake()->sentence(),
            'anonymous_user_id' => fake()->sentence(),
            'anonymous_datetime' => fake()->sentence(),
            'created' => fake()->sentence(),
            'created_user_id' => fake()->sentence(),
            'modified' => fake()->sentence(),
            'modified_user_id' => fake()->sentence(),
            'modified_action' => fake()->sentence(),
        ];
    }
}
