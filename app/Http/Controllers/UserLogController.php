<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserLog;
class UserLogController extends Controller
{
    public function destroy($id)
    {
        try {
            // Find the log by ID
            $log = UserLog::findOrFail($id);
            
            // Optional: Add authorization check
            // $this->authorize('delete', $log);
            
            // Delete the log
            $log->delete();
            
            return redirect()->back()->with('success', 'Log deleted successfully.');
            
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect()->back()->with('error', 'Log not found.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while deleting the log.');
        }
    }
    
    
    
    // return redirect()->back()->with('success', 'Log deleted successfully.');
    
}
