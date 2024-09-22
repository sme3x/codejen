<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("userss", function (Blueprint $table) {
            $table->id();
            $table->string("client_id");
            $table->string("salesforce_id");
            $table->string("manualm_merge");
            $table->string("sf_campaign_id");
            $table->string("promo_code_id");
            $table->string("promo_code_inserted");
            $table->string("contact_source");
            $table->string("first_name");
            $table->string("last_name");
            $table->string("address");
            $table->string("postal_code");
            $table->string("city");
            $table->string("country");
            $table->string("phone");
            $table->string("phone2");
            $table->string("email");
            $table->string("birthday");
            $table->string("client_sex");
            $table->string("brand_id");
            $table->string("domain");
            $table->string("lang");
            $table->string("source_table");
            $table->string("source_id");
            $table->string("vin");
            $table->string("model_code");
            $table->string("model_index");
            $table->string("registration_plate_nr");
            $table->string("categories");
            $table->string("small_note");
            $table->string("bounced");
            $table->string("bounced_last_datetime");
            $table->string("enewsdisable");
            $table->string("enewsdisable_datetime");
            $table->string("email_status");
            $table->string("phonedisable");
            $table->string("phonedisable_datetime");
            $table->string("phone_status");
            $table->string("profiling");
            $table->string("profiling_datetime");
            $table->string("manual_signup");
            $table->string("employee_id");
            $table->string("employee_name");
            $table->string("cost_carrier_id");
            $table->string("anonymous");
            $table->string("company_id");
            $table->string("anonymous_user_id");
            $table->string("anonymous_datetime");
            $table->string("created");
            $table->string("created_user_id");
            $table->string("modified");
            $table->string("modified_user_id");
            $table->string("modified_action");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("userss");
    }
};
